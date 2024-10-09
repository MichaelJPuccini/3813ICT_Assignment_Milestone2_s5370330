import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('add 3 toasts', () => {
    service.add('test message', 3000, 'success');
    service.add('test message', 3000, 'success');
    service.add('test message', 3000, 'success');
    expect(service.toasts.length).toBe(3);
  });

  it('add 5 toasts, remove 1 toast', () => {
    service.add('test message', 3000, 'success');
    service.add('test message', 3000, 'success');
    service.add('test message', 3000, 'success');
    service.add('test message', 3000, 'success');
    service.add('test message', 3000, 'success');
    service.remove(0);
    expect(service.toasts.length).toBe(4);
  });


  it('add 2 toasts, remove 2 toasts', () => {
    service.add('test message', 3000, 'success');
    service.add('test message', 3000, 'success');
    service.remove(0);
    service.remove(0);
    expect(service.toasts.length).toBe(0);
  });

});
