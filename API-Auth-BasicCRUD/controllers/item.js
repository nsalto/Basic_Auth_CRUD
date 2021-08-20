const Item = require('../models/item');

const getAllItems = async (req, res, next) => {
    const Item = await Item.find({});
    res.status(200).json(Item);
};

const createItem = async (req, res, next) => {
    const newItem = new Item(req.body);
    try {
        const Item = await newItem.save();
        res.status(201).json(Item);
    } catch(error) {
        error.status(400);
        next(error);
    }
};

const getItemByTitle = async(req, res, next) => {
    console.info('Titulo',req.params);
    const title = req.params.title
    try {
        await Item.findOne({title : title}, (err, docs) => {
            if(err) {
                return next(err)
            } else {
                res.status(200).json(docs);
            }
        });  
    } catch(error) {
        error.status = 400;
        next(error)
    }
}

const editItem = async(req, res, next) => {
    const itemId = req.params;
    const newItem = req.body;
    try {
        await Item.findByIdAndUpdate(itemId, newItem);
        res.status(200).json({ success: true });
    } catch(error) {
        error.status = 400;
        next(error);
    }
};

const deleteItem = async (req, res, next) => {
    const itemId = req.params;
    try {
        await Item.findByIdAndRemove(itemId);
        res.status(200).json(
            { 
              success: true,
              message: "deleted" 
            });
    }catch(error) {
        error.status = 400;
        next(error);
    }
};

module.exports = {
    getAllItems,
    createItem,
    editItem,
    deleteItem,
    getItemByTitle,
}