import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'localdate',
})
export class LocaldatePipe implements PipeTransform {
	transform(datestring: string): string {
		const date: Date = new Date(datestring);
		const options: any = {
			weekday: 'short',
			day: 'numeric',
			month: 'short',
			hours: 'numeric',
			minutes: 'numeric',
		};
		return date.toLocaleDateString('de-CH', options);
	}
}
