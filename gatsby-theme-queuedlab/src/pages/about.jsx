import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/layout/Layout.tsx";
import config from "../../data/site-config";

class AboutPage extends Component {
  render() {
    return (
      <Layout>
        <div className="about-container">
          <Helmet title={`About | ${config.siteTitle}`} />
          {/* TODO: update about page */}
        </div>
      </Layout>
    );
  }
}

export default AboutPage;
