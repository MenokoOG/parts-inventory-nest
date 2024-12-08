import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const args = process.argv;
  if (args.includes('--seed')) {
    const seedService = app.get(SeedService);
    await seedService.seedData();
    console.log('Seeding completed successfully!');
    process.exit();
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application running on port ${port}`);
}
bootstrap();
