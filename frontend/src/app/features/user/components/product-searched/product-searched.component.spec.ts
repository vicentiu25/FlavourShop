import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchedComponent } from './product-searched.component';

describe('ProductSearchedComponent', () => {
  let component: ProductSearchedComponent;
  let fixture: ComponentFixture<ProductSearchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSearchedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
