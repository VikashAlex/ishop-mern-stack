const categoryModel = require("../models/category.model");
const categoryUniueName = require("../utility/helper")
const productModel = require("../models/product.model");
const fs = require('fs')

const categoryController = {
  async getCategory(req, res) {
    const { id } = req.params;
    let getCategory = null
    try {
      if (id) {
        getCategory = await categoryModel.findById(id);
      } else {
        getCategory = await categoryModel.find();

        const data = await Promise.all(
          getCategory.map(async(cat)=>{
            const productCount = await productModel.countDocuments({categoryId:cat._id});
            return {
              ...cat.toObject(),
              productCount
            }
          })
        )
        return res.status(201).json({ msg: "Data Get Successfully...", data });
      }
      if (getCategory) {
        return res.status(201).json({ msg: "Data Get Successfully...", getCategory });
      }
    } catch (error) {
      console.log(error)
      return res.status(501).json({ msg: "Internal Server Error..", success: false });
    }
  },
  async createCategory(req, res) {
    const { name, slug, status } = req.body;
    const Categoryimage = req.files?.image;
    if (!name || !slug || !Categoryimage) {
      return res.status(400).json({ msg: "All fileds are required...", success: false });
    }
    try {
      const existing = await categoryModel.findOne({ name });
      if (existing) {
        return res.status(409).json({ msg: "Category name must be unique...😥", success: false });
      }
      const imgName = categoryUniueName(Categoryimage.name)
      const destination = 'public/images/categoryImg/' + imgName;
      Categoryimage.mv(destination, async (error) => {
        if (error) {
          return res.status(500).json({ msg: "File not uploaded...", success: false });
        }

        const createData = await categoryModel.create({
          name,
          slug,
          status,
          image: imgName
        });

        return res.status(201).json({ msg: "Category created successfully...😋", success: true, data: createData });
      });

    } catch (error) {
      return res.status(500).json({ msg: "Internal Server Error...😪", success: false });
    }
  },
  async updateCategory(req, res) {
    try {
      const { id } = req.params
      const category = await categoryModel.findById(id);
      if (category) {
        await categoryModel.findByIdAndUpdate(id, { $set: { status: !category.status } });
        return res.status(201).json({ msg: "Category update successfully...", success: true });
      }
      return res.status(301).json({ msg: "Category not exist in database...", success: false });

    } catch (error) {
      return res.status(501).json({ msg: "Internal Server Error..", success: false });
    }
  },
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await categoryModel.findById(id);
      if (category) {
        fs.unlinkSync(`./public/images/categoryImg/${category.image}`)
        await categoryModel.findByIdAndDelete(id);
        return res.status(201).json({ msg: "Category delete successfully...", success: true })
      }
      return res.status(301).json({ msg: "Category not exist in database...", success: false });
    } catch (error) {
      console.log(error)
      return res.status(501).json({ msg: "Internal Server Error..", success: false });
    }
  },
  async editCategory(req, res) {
    const { id } = req.params;
    const { name, slug, status } = req.body;
    const Categoryimage = req.files?.image;

    if (!name || !slug) {
      return res.status(400).json({ msg: "All fields are required...", success: false });
    }

    try {
      const existing = await categoryModel.findById(id);
      if (!existing) {
        return res.status(404).json({ msg: "Category not found", success: false });
      }

      const update = {};
      if (name) update.name = name;
      if (slug) update.slug = slug;
      if (status) update.status = status;

      if (Categoryimage) {
        if (existing.image) {
          try {
            fs.unlinkSync(`./public/images/categoryImg/${existing.image}`);
          } catch (err) {
            return res.status(203).json({ msg: "Old image not found, skipping delete...", success: true });
          }
        }
        const imgName = categoryUniueName(Categoryimage.name);
        const destination = 'public/images/categoryImg/' + imgName;
        Categoryimage.mv(destination, async (error) => {
          if (error) {
            return res.status(500).json({ msg: "File not uploaded...", success: false });
          }
          update.image = imgName;
          const createData = await categoryModel.updateOne(
            { _id: id },
            { $set: update }
          );

          return res.status(201).json({ msg: "Category updated successfully 😋", success: true, data: createData });
        });
      } else {
        const createData = await categoryModel.updateOne(
          { _id: id },
          { $set: update }
        );
        return res.status(201).json({ msg: "Category updated successfully 😋", success: true, data: createData });
      }
    } catch (error) {
      return res.status(500).json({ msg: "Internal Server Error...😪", success: false });
    }
  }
}

module.exports = categoryController;
