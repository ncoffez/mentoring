import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'duration',
})
export class DurationPipe implements PipeTransform {
	transform(duration: number): string {
		const seconds = duration / 1000;
		const min = Math.floor(seconds / 60) % 60;
		const hours = Math.floor( seconds / 60 / 60);
		return `${hours}h ${min}min`;
	}
}
