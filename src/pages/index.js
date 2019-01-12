import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGlobe, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { fab, faGithub, faInstagram, faMedium, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons'
import Layout from '../components/Layout';
import Landing from '../sections/Landing';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Writing from '../sections/Writing';
import Header from '../components/Header';
import Footer from '../components/Footer';

library.add(faGlobe, fab, faEnvelope, faGithub, faInstagram, faMedium, faLinkedin, faTwitter)
const IndexPage = () => (
  <Layout>
    <Header />
    <Landing />
    <About />
    <Projects />
    <Writing />
    <Footer />
  </Layout>
);

export default IndexPage;
