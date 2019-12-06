import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby-link'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export  class IndexPageTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      isValidated: false,
      scroll: "",
      top: "",
    }

    this.handleScroll = this.handleScroll.bind(this);

  }

  handleScroll () {
    this.setState({scroll: window.scrollY});
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  componentDidMount() {

    const el = document.getElementById('sticky-form');
    this.setState({top: el.offsetTop, height: el.offsetHeight});
    window.addEventListener('scroll', this.handleScroll);
  }

  render() {
    const { image, title, header, logo, content, contentComponent } = this.props;
    const PostContent = contentComponent || Content

    return(
      <div className="container">
        <div className="row">
          <div className="columns">
            <div className="column is-10">
              <div style={{maxWidth: 560}}>
                <PreviewCompatibleImage imageInfo={header.image} />
              </div>
            </div>
            <div className="column is-2 mobile-logo">
              <PreviewCompatibleImage imageInfo={logo.image} />
            </div>
          </div>
        </div>
        <br />
        <br />
        <PreviewCompatibleImage imageInfo={image} />
        <br />
        <br />
        <div className="row">
          <div className="columns">
            <div className="text-wrap">
              <PostContent content={content} className="markdown" />
            </div>
            <div className="column">
              <div className="form-wrap" id="sticky-form" 
                style={this.state.scroll > this.state.top ? { position: "fixed", top: "20px"} : { position: "relative"}} >
                <form
                    name="contact"
                    method="post"
                    action="/contact/thanks/"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                  >
                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                    <input type="hidden" name="form-name" value="contact" />
                    <div hidden>
                      <label>
                        Don’t fill this out:{' '}
                        <input name="bot-field" onChange={this.handleChange} />
                      </label>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type={'text'}
                          name={'name'}
                          onChange={this.handleChange}
                          id={'name'}
                          required={true}
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type={'email'}
                          name={'email'}
                          onChange={this.handleChange}
                          id={'email'}
                          required={true}
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type={'number'}
                          name={'phonenumber'}
                          onChange={this.handleChange}
                          id={'phonenumber'}
                          required={true}
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type={'date'}
                          name={'date'}
                          onChange={this.handleChange}
                          id={'date'}
                          required={true}
                          placeholder="DOB"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <select>
                          <option value="">Seclect Country</option>
                          <option value="australia">Australia</option>
                          <option value="united kingdom">United Kingdom</option>
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <select>
                          <option value="">Select Program Level</option>
                          <option value="certificate">Certificate</option>
                          <option value="deploma">Deploma</option>
                          <option value="advanced deploma">Advanced Deploma</option>
                          <option value="associate degree">Associate Degree</option>
                          <option value="user graduation">User Graduation</option>
                          <option value="post graduation">Post Graduation</option>
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <select>
                          <option value="">Select Course</option>
                          <option value="bussiness and management">Bussiness and Management</option>
                          <option value="engineering">Engineering</option>
                          <option value="law">Law</option>
                          <option value="computer science">Computer Science</option>
                          <option value="art and design">Art and Design</option>
                          <option value="bioscience and health">BioSience && Health</option>
                          <option value="humanities">Humanities</option>
                          <option value="others">Others</option>
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <select>
                          <option value="">Preferred Learning Center</option>
                          <option value="mumbai">Mumbai</option>
                          <option value="coimbatore">Coimbatore</option>
                          <option value="chennai">Chennai</option>
                          <option value="delhi">Delhi</option>
                          <option value="pune">Pune</option>
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          type={'radio'}
                          name={'terms-policy'}
                          onChange={this.handleChange}
                          id={'terms-policy'}
                          required={true}
                          value="Yes"
                        />  You agree to our <a href="#">Terms and conditions</a> and our <a href="#">privacy policy</a>.*
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          type={'radio'}
                          name={'contact-me'}
                          onChange={this.handleChange}
                          id={'contact-me'}
                          required={true}
                          value="Yes"
                        />  I Authorize TimesPro to contact me.
                      </div>
                    </div>
                    <div className="field">
                      <button className="button is-link" type="submit">
                        Enquire now
                      </button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } 
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  header: PropTypes.object,
  logo: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
}

const IndexPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        header={frontmatter.header}
        logo={frontmatter.logo}
        title={frontmatter.title}
        content={html}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
        header {
          alt
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        logo {
          alt
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
