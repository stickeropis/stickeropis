import React from 'react';
import App, { Container } from 'next/app';

import CssBaseline from '@material-ui/core/CssBaseline';

import Fonts from 'components/fonts';

export default class CustomApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Fonts />
                <CssBaseline />
                <Component {...pageProps} />
            </Container>
        );
    }
}
