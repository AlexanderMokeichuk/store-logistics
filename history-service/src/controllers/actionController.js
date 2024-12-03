const {logAction, getActionHistory, updateHistoryAction} = require('../services/actionSrvice');

const logActionController = async (req, res) => {
    const {productId, shopId, plu, action} = req.body;

    try {
        const actionRecord = await logAction(productId, shopId, plu, action);
        res.status(201).json(actionRecord);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateAction = async (req, res) => {
    const {product_id, shop_id, action} = req.body;

    if (!product_id || !shop_id || !action) {
        return res.status(400).json({error: 'product_id, shop_id, and action are required'});
    }

    try {
        const updatedHistory = await updateHistoryAction(product_id, shop_id, action);

        res.status(200).json(updatedHistory);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
};

const getActionHistoryController = async (req, res) => {
    const {shopId, plu, dateFrom, dateTo, action, page = 1, pageSize = 10} = req.query;

    try {
        const filters = {
            shopId: Number(shopId),
            plu,
            dateFrom,
            dateTo,
            action,
        };

        const {
            actionHistory,
            totalCount,
            totalPages,
            currentPage
        } = await getActionHistory(filters, page, Number(pageSize));

        res.status(200).json({
            actionHistory,
            totalCount,
            totalPages,
            currentPage,
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {logActionController, getActionHistoryController, updateAction};