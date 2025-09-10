/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';



import { UsersRoutingModule } from './users-routing.module';


// components
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';

import { ThemeModule } from '../@theme/theme.module';
import { AuthModule } from '../@auth/auth.module';
import { ComponentsModule } from '../@components/components.module';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { IgxButtonModule,
  IgxIconModule,
  IgxCardModule,
  IgxRippleModule,
  IgxToggleModule,
  IgxInputGroupModule,
  IgxDialogModule,
  IgxAvatarModule,
  IgxDropDownModule,
  IgxCheckboxModule } from '@infragistics/igniteui-angular';

const  NB_MODULES = [
  // NbActionsModule,
  // NbButtonModule,
  // NbCardModule,
  // NbInputModule,
  // NbTabsetModule,
  // NbUserModule,
  // NbRadioModule,
  // NbSelectModule,
  // NbListModule,
  // NbIconModule,
  // NbSpinnerModule,
  // NbDatepickerModule,
  // NbInputModule,
  IgxDemoModule,
  IgxButtonModule,
  IgxIconModule,
  IgxCardModule,
  IgxRippleModule,
  IgxToggleModule,
  IgxRippleModule,
  IgxDialogModule,
  IgxInputGroupModule,
  IgxIconModule,
  IgxAvatarModule,
  IgxButtonModule,
  IgxDropDownModule,
  IgxCheckboxModule,
];

@NgModule({
    imports: [
        ThemeModule,
        AuthModule,
        UsersRoutingModule,
        ComponentsModule,
        ReactiveFormsModule,
        ...NB_MODULES,
    ],
    declarations: [
        UsersComponent,
        UserComponent,
    ],
    providers: []
})
export class UsersModule { }
