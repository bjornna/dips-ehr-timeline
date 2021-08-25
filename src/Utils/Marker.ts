import type TimeRuler from "./timeRuler";

export default class Marker {
    readonly LeftMargin: number = 100;
    readonly OneHour: number = 3600000;
    readonly OneDay: number = this.OneHour*24;

    time: number;
    localTime: number;
    ruler: TimeRuler;
    
    constructor(time: number, localTime: number, ruler: TimeRuler) {
        this.time = time;
        this.localTime = localTime;
        this.ruler = ruler;
    }

    isVisible(unit: number) : boolean {
        return (this.time)%(unit*this.OneHour*0.5) == 0 && 
               (this.time)%(unit*this.OneHour) != 0;               
    }

    drawLine(context: CanvasRenderingContext2D, x: number, height: number, bold: boolean = false) {
        if (bold) {
            context.strokeStyle = "#aaaaaa";
        } else {
            context.strokeStyle = "#dddddd";
        }
        context.beginPath();
        context.moveTo(x, 25);
        context.lineTo(x, height);
        context.stroke();     
    }

    render(context: CanvasRenderingContext2D, width: number, height: number) {           
        const marker = "|";

        var x = this.ruler.getX(this.time, width);       
        if (x > this.LeftMargin) {
            context.font = "12px Arial";
            context.fillText(marker, x - context.measureText(marker).width/2, 15);
            this.drawLine(context, x, height);
        }
    }
}