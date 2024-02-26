import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/DTOs';
import { EditUserDto } from 'src/user/dto/edit.user.dto';
import { CreateBookmarkDto } from 'src/bookmark/dto';
describe('app e2e ', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('auth', () => {
    const dto: AuthDto = {
      email: 'Joan@gmail.com',
      password: 'Password',
    };
    describe('signUp', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
          .inspect();
      });
      it('should throw if email password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.email,
          })
          .expectStatus(400)
          .inspect();
      });
      it('should throw if no body', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400).inspect();
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .inspect();
      });
    });
    describe('Login', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
          .inspect();
      });
      it('should throw if email password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.email,
          })
          .expectStatus(400)
          .inspect();
      });
      it('should throw if no body', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400).inspect();
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });
  describe('User', () => {
    const editDto:EditUserDto ={
      id:1,
      email:"Vladimit@gmail.com",
      lastName:"",
      firstName:"name"
    }
    describe('Get Profile', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/profile')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .inspect();
      });
    });
    describe('Edit User', () => {
      it('should edit user', () => {
        return pactum
          .spec()
          .patch('/users')
          .withBearerToken('$S{userAt}')
          .withBody(editDto)
          .expectStatus(200)
          .inspect();
      });
    });
  });


  describe('Bookmarks', () => {
    describe('Get empty bookmark', () => {
      it('should get bookmarks',() => {
        return pactum
          .spec()
          .withBody({id:1})
          .get('/bookmarks')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .inspect()
          .expectBody([])  ;
      })
    });
    describe('Get bookmarks', () => {});
    describe('Create bookmark', () => {
      
      it('should create bookmark',() => {
        const dto:CreateBookmarkDto = {
          title:"First Bookmar",
          description:"",
          link:"www.youtube.com"
        }
        return pactum
          .spec()
          .withBody(dto)
          .post('/bookmarks')
          .withBearerToken('$S{userAt}')
          .expectStatus(201)
          .inspect()
      })
    });
    describe('Edit bookmark', () => {});
    describe('Get bookmark by id', () => {});
    describe('Delete bookmark ', () => {});
  });
  it.todo('Should pass');
});
