import { UsersService } from './users/users.service';
import { GenderUser } from './users/users.schema';
import { Role } from 'src/models/users/users.schema';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { InitUserDTO, UserDTO } from './users/dto/user-dto';
import { SeoHomeModule } from './seo-home/seo-home.module';
@Module({
    imports: [ItemsModule, UsersModule, SeoHomeModule],
})
export class ModelsModule {
    constructor(private usersService: UsersService) {
        this.initData();
    }

    async initUser(): Promise<UserDTO> {
        const data: InitUserDTO = {
            email: 'demo@gmail.com',
            firstName: 'Du',
            lastName: 'Le',
            avatar: 'https://appdu-storage.s3-ap-southeast-1.amazonaws.com/118005360_928999227584443_8060562362571425079_o.png',
            password: '123456',
            roles: [Role.USER, Role.ADMIN],
            gender: GenderUser.MALE,
            phone: '84328111597',
            facebook: 'https://www.facebook.com/dusainbolt/',
        };
        const user = new this.usersService.userModel(data);
        return user.save();
    }

    //   async initStore(id: string): Promise<StoreDTO> {
    //     const data: InitStoreDTO = {
    //       email: 'storedemo@gmail.com',
    //       name: 'Store Demo',
    //       logo: 'https://appdu-storage.s3-ap-southeast-1.amazonaws.com/118005360_928999227584443_8060562362571425079_o.png',
    //       logoText: 'Store Demo',
    //       descriptionLogo: 'Xin chao den voi Du Sainbolt noi ban co the mua sam moi thu',
    //       storeContact: {
    //           hotline: '19001006'
    //       }
    //     };
    //     const store = new this.storesService.storeModel(data);
    //     return store.save();
    //   }

    async initData() {
        const users = await this.usersService.userModel.find();
        if (!users.length) {
            const oneUser = await this.initUser();

            //   console.log(dataUser.id);
        }
    }
}
