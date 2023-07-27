export interface ISwiperComponent {
    dinamicClassName: string;
    array?: string[];
    setActiveIndex: (state: number) => void;
}