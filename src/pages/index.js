import React from 'react';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faEnvelope, faGlobe} from '@fortawesome/free-solid-svg-icons'
import {fab, faGithub, faInstagram, faLinkedin, faMedium, faTwitter} from '@fortawesome/free-brands-svg-icons'
import Layout from '../components/Layout';
import Landing from '../sections/Landing';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Writing from '../sections/Writing';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {SingleModal} from "../components/Modal";
import {useSingleModal} from "../contexts/singleModalContext";


library.add(faGlobe, fab, faEnvelope, faGithub, faInstagram, faMedium, faLinkedin, faTwitter)

const IndexPage = () => {
  const { show, toggle, content } = useSingleModal();

  return (
    <Layout>
      <Header />
      <Landing />
      <About />
      <Projects />
      <Writing />
      <Footer />
      <SingleModal isOpen={show} toggle={() => toggle()} unmountOnClose={false}>
        {content}
      </SingleModal>
    </Layout>
        );
}

export default IndexPage;
