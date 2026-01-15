const Footer = () => {
    return (
        <footer className="border-t border-slate-200 bg-white mt-16">
            <div className="max-w-7x1 mx-auto px-4 sm:px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-600">
                    {/* Column 1 */}
                    <div>
                        <h3 className="text-slate-900 font-semibold mb-2">
                            FakeStore Demo
                        </h3>
                        <p>
                            Full-stack e-commerce demo built with React, TypeScript, Firebase, and Tailwind CSS.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h3 className="text-slate-900 font-semibold mb-2">
                            Developer
                        </h3>
                        <p>Kathryn Baldridge</p>
                        <p className="mt-1">
                            Full-Stack Software Developer
                        </p>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="text-slate-900 font-semibold mb-2">
                            Links
                        </h3>
                        <ul className="space-y-1">
                            <li>
                                <a 
                                    href="https://github.com/kattyalice/fakestore-demo"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-blue-600"
                                >
                                    GitHub Repository
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://www.linkedin.com/in/kathryn-baldridge/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-blue-600"
                                >
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-200 text-cener text-sm text-slate-500">
                        © {new Date().getFullYear()} Kathryn Baldridge · Demo project for portfolio purposes
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;