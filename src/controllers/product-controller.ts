import { Product } from "../entities/Product";
import { ProductService } from "../services/product-service";
import { Request, Response } from "express";

const productService = new ProductService();

export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {

        const products = await productService.findAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
};

export const findById = async (req: Request, res: Response): Promise<void> => {
    try {

        const id = Number(req.params.id);

        const product = await productService.findById(id);

        if (!product) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar produto' });
    }
}

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price } = req.body;

        if (!name || !price) {
            res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
            return;
        }

        const data: Product = new Product();

        data.name = name;
        data.price = price;

        const product = await productService.create(data);

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID inválido' });
            return;
        }

        await productService.deleteProduct(id);

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir produto' });
    }
}; 

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const { name, price } = req.body;

        if (!name || !price) {
            res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
            return;
        }

        const data: Product = new Product();

        data.name = name;
        data.price = price;

        const updatedProduct = await productService.update(id, data);

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
};