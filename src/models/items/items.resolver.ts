import { ItemUpdateDTO } from './dto/update-dto';
import { CreateItemDTO } from './dto/create-item-dto';
import { Resolver, Query, Mutation, Args, Directive } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { ItemDTO } from './dto/type-item-dto';

@Resolver(of => ItemDTO)
export class ItemsResolver {
    constructor(private readonly itemsService: ItemsService) {}

    @Directive('@deprecated(reason: "This query will be removed in the next version")')
    @Query(returns => [ItemDTO])
    async items(): Promise<ItemDTO[]> {
        return this.itemsService.findAll();
    }

    @Mutation(returns => ItemDTO)
    async createItem(@Args('input') input: CreateItemDTO): Promise<ItemDTO> {
        return this.itemsService.create(input);
    }

    @Mutation(returns => ItemDTO)
    async updateItem(@Args('id') id: string, @Args('input') input: ItemUpdateDTO) {
        return this.itemsService.update(id, input);
    }

    @Mutation(returns => ItemDTO)
    async deleteItem(@Args('id') id: string) {
        return this.itemsService.delete(id);
    }

    @Query(returns => String)
    async hello() {
        return 'hello';
    }
}
