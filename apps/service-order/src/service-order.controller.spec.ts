import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOrderController } from './service-order.controller';
import { ServiceOrderService } from './service-order.service';

describe('ServiceOrderController', () => {
  let serviceOrderController: ServiceOrderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceOrderController],
      providers: [ServiceOrderService],
    }).compile();

    serviceOrderController = app.get<ServiceOrderController>(ServiceOrderController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceOrderController.getHello()).toBe('Hello World!');
    });
  });
});
