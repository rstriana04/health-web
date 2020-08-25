import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'health-popup-delete-confirmation',
  templateUrl: './popup-delete-confirmation.component.html',
  styleUrls: ['./popup-delete-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupDeleteConfirmationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public onNoClick() {

  }
}
