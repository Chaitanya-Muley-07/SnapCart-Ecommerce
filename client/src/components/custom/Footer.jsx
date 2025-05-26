import React from "react";
import { Button } from "../ui/button";
import { FacebookIcon, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-zinc-900 py-12 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { title: "Features", links: ["Cool stuff", "Random feature", "Team feature", "Stuff for developers", "Another one", "Last time"] },
            { title: "Resources", links: ["Resource", "Resource name", "Another resource", "Final resource"] },
            { title: "About", links: ["Team", "Locations", "Privacy", "Terms"] },
            { title: "Help", links: ["Support", "Help Center", "Contact Us"] },
          ].map((section) => (
            <div key={section.title}>
              <h5 className="text-xl font-bold mb-4 dark:text-white">{section.title}</h5>
              <ul>
                {section.links.map((link) => (
                  <li key={link} className="mb-2">
                    <a
                      href="#"
                      className="border-b border-transparent hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-full md:col-span-1">
            <h5 className="text-xl font-bold mb-4 dark:text-white">Stay connected</h5>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FacebookIcon className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-blue-500" />
              </a>
              <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-sky-400" />
              </a>
              <a href="#" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-red-500" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 mt-12 pt-8 grid md:grid-cols-4 gap-6 text-sm">
          <div className="font-bold dark:text-white">FWR</div>
          <div>
            <h6 className="font-bold mb-2 dark:text-white">Address</h6>
            <address className="not-italic dark:text-gray-300">
              123 6th St.<br />
              Melbourne, FL 32904
            </address>
          </div>
          <div>
            <h6 className="font-bold mb-2 dark:text-white">Free Resources</h6>
            <p className="dark:text-gray-300">
              Use our HTML blocks for <strong>FREE</strong>.<br />
              <em>All are MIT License</em>
            </p>
          </div>
          <div className="flex items-start md:justify-end">
            <Button className="dark:bg-gray-700 dark:text-white">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
