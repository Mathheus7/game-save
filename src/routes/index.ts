import { Router } from "express";
import { findAll, create, deleteProduct, findById, update } from "../controllers/product-controller";

const router = Router();

router.get('/products/all', findAll);
router.get('/products/id/:id', findById)
router.post('/products/new', create);
router.delete('/products/delete/:id', deleteProduct);
router.put('/products/update/id/:id', update);


export default router;