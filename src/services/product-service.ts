import { Product } from "../entities/Product";
import AppDataSource from "../database/data-source";

export class ProductService {
    private productRepository = AppDataSource.getRepository(Product);

    async findAll() {
        return this.productRepository.find(
            {
                order: {
                    id: 'ASC',
                },
            }
        );  
    }

    async findById(id: number) {
        return this.productRepository.findOneBy({id});
    }

    async create(product: Product) {
        return this.productRepository.save(product)
    }

    async deleteProduct(id: number) {
        const product = await this.productRepository.findOneBy({id});

        if (!product) {
            throw new Error('Produto não encontrado');
        }

        await this.productRepository.remove(product);
    }

    async update(id: number, data: {name: string, price: number}) {
        const product = await this.productRepository.findOneBy({id});

        if (!product) {
            throw new Error('Produto não encontrado');
        }

        if (data.name !== undefined) product.name = data.name;
        if (data.price !== undefined) product.price = data.price;

        return this.productRepository.save(product);
    }
}