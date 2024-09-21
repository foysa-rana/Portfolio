const Contact = () => {
  return (
    <section id="contact">
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <h2>Contact Me</h2>
          </div>
          <div className="content">
            <form>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us more about your needs........"
                required
              ></textarea>
              <div className="button-group">
                <button type="submit" className="btn">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
