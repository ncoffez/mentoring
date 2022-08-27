import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'localdate',
})
export class LocaldatePipe implements PipeTransform {
	transform(datestring: string): string {
		const date: Date = new Date(datestring);
        console.log(date);
		const options: any = {
			weekday: 'short',
			day: 'numeric',
			month: 'short',
            hour: 'numeric',
            minute: 'numeric'
		};
        const datepart = date.toLocaleDateString('de-CH', options);
		return datepart;
	}
}
