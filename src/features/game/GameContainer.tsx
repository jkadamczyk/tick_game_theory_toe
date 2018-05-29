import * as React from 'react';
import "./GameContainer.css";
import { CommonUtil } from '../../common/util/CommonUtil';

export class GameContainer extends React.Component<{}, {}> {
    public canvas: HTMLCanvasElement;
    public parentDiv: HTMLDivElement;
    public width: number;
    public height: number;
    
    public constructor(props) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        this.width = this.parentDiv.clientWidth;
        this.height = this.parentDiv.clientHeight;
        this.updateCanvasDimensions();
        window.addEventListener('resize', this.updateCanvasDimensions);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.updateCanvasDimensions);
    }

    private updateCanvasDimensions = () => {
        this.width = this.parentDiv.clientWidth;
        this.height = this.parentDiv.clientHeight;
        const canvasWidth = CommonUtil.calculateCanvasDimension(this.width);
        const canvasHeight = CommonUtil.calculateCanvasDimension(this.height);
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        console.log('updateCanvasDimensions', canvasWidth, canvasHeight, this.width, this.height);
    };

    public render() {
        return (
            <div ref={ref => this.parentDiv = ref} className="GameContainer">
                <canvas ref={ref => this.canvas = ref}/>
            </div>
        );
    }
}