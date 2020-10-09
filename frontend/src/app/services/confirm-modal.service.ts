import {Component, Injectable, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  openDeleteModal(message: string, cancelButton: string, confirmButton: string): Observable<boolean> {
    return this.openModal(message, cancelButton, confirmButton, ModalType.DELETE);
  }

  private openModal(message: string, cancelButton: string, confirmButton: string, modalType: ModalType): Observable<boolean> {
    const subject = new Subject<boolean>();

    const initialState = {
      message,
      cancelButton,
      confirmButton,
      modalType,
      onConfirm: () => this.modalClosed(subject, true),
      onCancel: () => this.modalClosed(subject, false)
    };

    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {initialState});
    return subject;
  }

  private modalClosed(subject: Subject<boolean>, valueForSubject: boolean): void {
    subject.next(valueForSubject);
    this.bsModalRef.hide();
    subject.complete();
  }
}

@Component({
  selector: 'app-confirm-modal',
  template: `
    <div class="modal-body">
      <h4 class="modal-title pull-left">{{message}}</h4>
    </div>
    <div class="modal-footer" *ngIf="modalType == ModalType.DELETE">
      <button type="button" class="btn btn-default" (click)="onCancel()">{{cancelButton}}</button>
      <button type="button" class="btn btn-danger" (click)="onConfirm()">{{confirmButton}}</button>
    </div>
  `
})

export class ConfirmModalComponent implements OnInit {

  ModalType = ModalType;

  message: string;
  cancelButton: string;
  confirmButton: string;
  onConfirm: () => void;
  onCancel: () => void;
  modalType: ModalType;

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
  }
}

enum ModalType {
  DELETE
}
