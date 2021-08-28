import { SeoHomeStatus } from './../dto/seoHome/SeoHomeEnum';
import { Resolver, Query } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { SeoHomeDTO } from '../dto/seoHome/SeoHomeDTO';
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

  async initSeoHome(): Promise<SeoHomeDTO> {
    const data: SeoHomeDTO = {
      description: "SEO description",
      title: "SEO title",
      domain: "codememory.io",
      facebookAppId: "102681978817056",
      faviconUrlICO: "https://du-sainbolt.web.app/favicon.png",
      faviconUrlJPG: "https://du-sainbolt.web.app/favicon.png",
      history: [],
      languageAlternates: "en",
      logo1280x1280: "https://appdu-storage.s3-ap-southeast-1.amazonaws.com/118005360_928999227584443_8060562362571425079_o.png",
      logo400x400: "https://appdu-storage.s3-ap-southeast-1.amazonaws.com/118005360_928999227584443_8060562362571425079_o.png",
      logo800x600: "https://appdu-storage.s3-ap-southeast-1.amazonaws.com/118005360_928999227584443_8060562362571425079_o.png",
      logoAlt: "Logo of CodeMemory",
      searchBoxUrl: "codememory.io/search",
      siteName: "CodeMemory",
      status: SeoHomeStatus.ACTIVE,
    };
    const seoHome = new this.seoHomeService.seoHomeModel(data);
    return seoHome.save();
  }

  async initTag(id: string): Promise<Tag[]> {
    const dataInit: Tag[] = [];
    for (let i = 1; i <= 15; i++) {
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
      // Init data user
      const oneUser = await this.initUser();
      // Init data user second
      await this.initUserPartSecond();
      // init data Tag
      const tags = await this.tagService.tagModel.find();
      if (!tags.length) {
        await this.initTag(oneUser.id);
      }
      // init data SeoHome
      const seoHomes = await this.seoHomeService.seoHomeModel.find();
      if (!seoHomes.length) {
        await this.initSeoHome();
      }
      return "Init data success";
    }

    return 'User is exits';
  }
}
