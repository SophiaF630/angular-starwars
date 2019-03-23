import { NgModule } from "@angular/core";

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';

const MODULES = [
    FlexLayoutModule,
    MatToolbarModule, MatListModule,
    MatButtonModule, MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule
]

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class MaterialModule { }