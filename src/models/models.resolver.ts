import { Resolver, Query } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { SeoHomeDTO, SeoHomeInitDTO } from './seo-home/dto/seo-home.dto';
import { InitUser, User } from './users/dto/user-dto';
import { SeoHomeService } from './seo-home/seo-home.service';
import { UserService } from './users/user.service';
import { Gender, Role } from './users/dto/user-enum';
import { HashService } from 'src/hash/hash.service';
import { Tag } from 'src/dto/tag/TagDTO';
import { TagStatus, TagType } from 'src/dto/tag/TagEnum';
import { convertToSlug } from 'src/common/functions';
import { TagService } from './tag/tag.service';

@Resolver(() => null)
export class ModelResolver {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private tagService: TagService,
    private seoHomeService: SeoHomeService
  ) { }

  async initUser(): Promise<User> {
    const password = await this.hashService.hashBcrypt('du@dev1234');
    const data: InitUser = {
      email: 'dulh181199@gmail.com',
      username: 'dusainbolt',
      firstName: 'Du',
      lastName: 'Le',
      avatar: 'https://appdu-storage.s3-ap-southeast-1.amazonaws.com/118005360_928999227584443_8060562362571425079_o.png',
      password: password,
      roles: [Role.ADMIN],
      gender: Gender.MALE,
      phone: '84328111597',
      facebook: 'https://www.facebook.com/dusainbolt/',
    };
    const user = new this.userService.userModel(data);
    return user.save();
  }

  async initUserPartSecond(): Promise<User> {
    const password = await this.hashService.hashBcrypt('12345678');
    const data: InitUser = {
      email: 'phuongceo13@gmail.com',
      username: 'phuongduc',
      firstName: 'Phương',
      lastName: 'Đúc',
      password: password,
      roles: [Role.ADMIN],
      gender: Gender.MALE,
      phone: '',
      facebook: 'https://www.facebook.com/dusainbolt/',
    };
    const user = new this.userService.userModel(data);
    return user.save();
  }

  async initSeoHome(id: string): Promise<SeoHomeDTO> {
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

  async initTag(id: string): Promise<Tag[]> {
    const dataInit: Tag[] = [];
    for (let i = 1; i <= 20; i++) {
      const title = `Lập Trình Viên ${i}`;
      dataInit.push({
        createBy: id,
        title,
        description: `Người phát triển phần mềm ứng dụng ${i}`,
        slug: convertToSlug(title),
        status: TagStatus.ACTIVE,
        tagType: TagType.SYSTEM,
        thumbnail: 'https://i.pinimg.com/736x/ec/14/7c/ec147c4c53abfe86df2bc7e70c0181ff.jpg',
      });
    }
    return this.tagService.tagModel.insertMany(dataInit);
  }
  @Query(() => String)
  async initData(): Promise<string> {
    const users = await this.userService.userModel.find();
    if (!users.length) {
      const oneUser = await this.initUser();
      await this.initSeoHome(oneUser.id);
      await this.initTag(oneUser.id);
      await this.initUserPartSecond();
      return 'Init Data Success';
    }
    return 'User is exits';
  }
}
