import css from 'styled-jsx/css';
export default css`
                .contentImage {
                    background: url(./assets/technology/image-launch-vehicle-landscape.jpg);
                    background-position: center center;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    width: 100%;
                    height: 200px;
                }

                @media(min-width: 768px){
                    .contentImage {
                        background: url(./assets/technology/image-launch-vehicle-portrait.jpg);
                        width: 100%;
                        height: 327px;
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                }

                @media(min-width: 900px) {
                    .contentImage {
                        width: 100%;
                        height: 427px;
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                }
`
