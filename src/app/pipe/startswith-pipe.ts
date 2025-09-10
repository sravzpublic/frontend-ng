import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'startsWith' })
export class AutocompletePipeStartsWith implements PipeTransform {
    public transform(collection: any[], term = '') {
        return collection.filter((item) => item.toString().toLowerCase().startsWith(term.toString().toLowerCase()));
    }
}
