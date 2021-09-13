import { Resolver, Query } from '@nestjs/graphql';
import { InitUser, User } from '../dto/user/UserDTO';
import { SeoHomeService } from './seo-home/seo-home.service';
import { UserService } from './users/user.service';
import { Gender, Role } from '../dto/user/UserEnum';
import { HashService } from 'src/hash/hash.service';
import { Tag } from 'src/dto/tag/TagDTO';
import { TagStatus, TagType } from 'src/dto/tag/TagEnum';
import { TagService } from './tag/tag.service';
import { SeoHome } from 'src/dto/seoHome/SeoHomeDTO';
import { helperService } from 'src/common/HelperService';
@Resolver(() => null)
export class ModelResolver {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private tagService: TagService,
    private seoHomeService: SeoHomeService
  ) {}

  async initUser(): Promise<User> {
    const password = await this.hashService.hashBcrypt('du@dev1234');
    const data: InitUser = {
      email: 'dulh181199@gmail.com',
      username: 'dusainbolt',
      firstName: 'Du',
      lastName: 'Le',
      avatar:
        'https://appdu-storage.s3-ap-southeast-1.amazonaws.com/118005360_928999227584443_8060562362571425079_o.png',
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

  async initSeoHome(id: string): Promise<SeoHome> {
    const data: SeoHome = {
      description: 'SEO mo ta',
      title: 'SEO Tiee de',
      titleEN: 'Seo title',
      descriptionEN: 'Seo description',
      domain: 'codememory.io',
      image: {
        faviconUrlICO: 'https://du-sainbolt.web.app/favicon.png',
        faviconUrlJPG: 'https://du-sainbolt.web.app/favicon.png',
        logo1280x720:
          'https://appdu-storage.s3-ap-southeast-1.amazonaws.com/118005360_928999227584443_8060562362571425079_o.png',
        logo400x400:
          'https://appdu-storage.s3-ap-southeast-1.amazonaws.com/118005360_928999227584443_8060562362571425079_o.png',
        logo800x600:
          'https://appdu-storage.s3-ap-southeast-1.amazonaws.com/118005360_928999227584443_8060562362571425079_o.png',
        logoAlt: 'Ảnh Logo của CodeMemory',
        logoAltEN: 'Logo image of CodeMemory',
      },
      social: {
        facebookAppId: '102681978817056',
        facebookPageUrl: null,
        twitterUrl: null,
        youtubeUrl: null,
      },
      history: [],
      facebookChatPlugin: '',
      createBy: id,
      reason: '',
      searchBoxUrl: 'codememory.io/search',
      siteName: 'CodeMemory',
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
        slug: helperService.convertToSlug(title),
        status: TagStatus.ACTIVE,
        tagType: TagType.SYSTEM,
        thumbnail: 'https://i.pinimg.com/736x/ec/14/7c/ec147c4c53abfe86df2bc7e70c0181ff.jpg',
      });
    }
    return this.tagService.tagModel.insertMany(dataInit);
  }

  @Query(() => String)
  async initData(): Promise<string> {
    // Init data user
    let user: User = null;
    const users = await this.userService.userModel.find();
    if (!users.length) {
      user = await this.initUser();
      // Init data user second
      await this.initUserPartSecond();
    } else {
      user = users[0];
    }
    // If valid user handle create data
    if (!!user.id) {
      // init data Tag
      const tags = await this.tagService.tagModel.find();
      if (!tags.length) {
        await this.initTag(user.id);
      }
      // init data SeoHome
      const seoHomes = await this.seoHomeService.seoHomeModel.find();
      if (!seoHomes.length) {
        await this.initSeoHome(user.id);
      }

      return 'Init data success';
    }

    return 'User is exits';
  }
}
