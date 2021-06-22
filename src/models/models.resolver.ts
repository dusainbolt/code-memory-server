import { Resolver, Query } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { SeoHomeDTO, SeoHomeInitDTO } from './seo-home/dto/seo-home.dto';
import { InitUser, User } from './users/dto/user-dto';
import { SeoHomeService } from './seo-home/seo-home.service';
import { UsersService } from './users/users.service';
import { Gender, Role } from './users/dto/user-enum';

@Resolver(() => null)
export class ModelResolver {
    constructor(private usersService: UsersService, private seoHomeService: SeoHomeService) {}

    async initUser(): Promise<User> {
        const data: InitUser = {
            email: 'demo@gmail.com',
            firstName: 'Du',
            lastName: 'Le',
            avatar: 'https://appdu-storage.s3-ap-southeast-1.amazonaws.com/118005360_928999227584443_8060562362571425079_o.png',
            password: '123456',
            role: Role.ADMIN,
            gender: Gender.MALE,
            phone: '84328111597',
            facebook: 'https://www.facebook.com/dusainbolt/',
        };
        const user = new this.usersService.userModel(data);
        return user.save();
    }

    async initSeoHome(id: MongooseSchema.Types.ObjectId): Promise<SeoHomeDTO> {
        const data: SeoHomeInitDTO = {
            owner: id,
            appName: 'CodeMemory',
            keyWord:
                'CodeMemory, CodeMemory Blog, CodeMemory diễn đàn, CodeMemory khóa học, CodeMemory Dịch vụ, Kiến thức, Lập trình, làm website, làm ứng dụng',
            author: 'Lê Huy Du',
            publisher: 'Lê Huy Du',
            contact: {
                address: '219 Trung Kính, Cầu Giấy, Hà Nội',
                email: 'codememory.hotro@gmail.com',
                phone: '+8432811197',
            },
            social: {
                youtube: 'https://www.youtube.com/channel/UCUPwDA86_PRWPDYvvOlj8IQ',
                facebook: 'https://www.facebook.com/dusainbolt',
                facebookPage: 'https://www.facebook.com/sainboltapp',
                skype: 'https://join.skype.com/invite/kP2kfn0Wu06U',
                twitter: 'https://join.skype.com/invite/kP2kfn0Wu06U',
            },
            meta: {
                title: 'Trang chủ CodeMemory - Điểm đến của sự chia sẻ, học hỏi, trao đổi trong lĩnh vực lập trình',
                description:
                    'Nền tàng chia sẻ blog, khóa học, diễn đàn. Giúp mở ra cái nhìn tổng quan, Đốt cháy niềm đam mê, khơi gợi sự sáng tạo trong chúng ta',
                imageUrl: 'https://appdu-storage.s3-ap-southeast-1.amazonaws.com/118005360_928999227584443_8060562362571425079_o.png',
                domain: 'https://du-sainbolt.web.app/',
                jsonType: 'Organization',
                logoUrl: 'https://appdu-storage.s3-ap-southeast-1.amazonaws.com/118005360_928999227584443_8060562362571425079_o.png',
                logoWidth: 1213,
                logoHeight: 231,
                facebookPageId: 'https://www.facebook.com/dusainbolt',
            },
        };
        const seoHome = new this.seoHomeService.seoHomeModel(data);
        return seoHome.save();
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

    @Query(() => String)
    async initData(): Promise<string> {
        const users = await this.usersService.userModel.find();
        if (!users.length) {
            const oneUser = await this.initUser();
            const seoHome = await this.initSeoHome(oneUser.id);
            return 'Init Data Success';
        }
        return 'User is exits';
    }
}
