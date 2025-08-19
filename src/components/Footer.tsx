import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialIcons = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/ostremgeopoeticas/",
      svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="social-icon" style="width: 24px; height: 24px; fill: #F6D8B8; cursor: pointer; transition: fill 0.2s ease"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 5.5C7.51472 5.5 5.5 7.51472 5.5 10C5.5 12.4853 7.51472 14.5 10 14.5C12.4853 14.5 14.5 12.4853 14.5 10C14.4974 7.51579 12.4842 5.50258 10 5.5ZM10 13C8.34315 13 7 11.6569 7 10C7 8.34315 8.34315 7 10 7C11.6569 7 13 8.34315 13 10C13 11.6569 11.6569 13 10 13ZM14.5 0.25H5.5C2.60179 0.2531 0.2531 2.60179 0.25 5.5V14.5C0.2531 17.3982 2.60179 19.7469 5.5 19.75H14.5C17.3982 19.7469 19.7469 17.3982 19.75 14.5V5.5C19.7469 2.60179 17.3982 0.2531 14.5 0.25ZM18.25 14.5C18.25 16.5711 16.5711 18.25 14.5 18.25H5.5C3.42893 18.25 1.75 16.5711 1.75 14.5V5.5C1.75 3.42893 3.42893 1.75 5.5 1.75H14.5C16.5711 1.75 18.25 3.42893 18.25 5.5V14.5ZM16 5.125C16 5.74632 15.4963 6.25 14.875 6.25C14.2537 6.25 13.75 5.74632 13.75 5.125C13.75 4.50368 14.2537 4 14.875 4C15.4963 4 16 4.50368 16 5.125Z" fill="#F6D8B8"></path> </svg>`
    },
    {
      name: "Facebook",
      url: "#",
      svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="social-icon" style="width: 24px; height: 24px; fill: #F6D8B8; cursor: pointer; transition: fill 0.2s ease"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0.25C4.61522 0.25 0.25 4.61522 0.25 10C0.25 15.3848 4.61522 19.75 10 19.75C15.3848 19.75 19.75 15.3848 19.75 10C19.7443 4.61758 15.3824 0.255684 10 0.25ZM10.75 18.2153V12.25H13C13.4142 12.25 13.75 11.9142 13.75 11.5C13.75 11.0858 13.4142 10.75 13 10.75H10.75V8.5C10.75 7.67157 11.4216 7 12.25 7H13.75C14.1642 7 14.5 6.66421 14.5 6.25C14.5 5.83579 14.1642 5.5 13.75 5.5H12.25C10.5931 5.5 9.25 6.84315 9.25 8.5V10.75H7C6.58579 10.75 6.25 11.0858 6.25 11.5C6.25 11.9142 6.58579 12.25 7 12.25H9.25V18.2153C4.85788 17.8144 1.55787 14.0299 1.75854 9.62409C1.95922 5.21827 5.58962 1.74947 10 1.74947C14.4104 1.74947 18.0408 5.21827 18.2415 9.62409C18.4421 14.0299 15.1421 17.8144 10.75 18.2153Z" fill="#F6D8B8"></path> </svg>`
    },
    {
      name: "Twitter",
      url: "#",
      svg: `<svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg" class="social-icon" style="width: 24px; height: 24px; fill: #F6D8B8; cursor: pointer; transition: fill 0.2s ease"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1928 3.46314C20.0768 3.18286 19.8033 3.00007 19.5 3.00001H16.6472C15.8359 1.61973 14.3604 0.765804 12.7594 0.750013C11.5747 0.734474 10.4339 1.19755 9.59531 2.03439C8.73219 2.8814 8.24717 4.04072 8.25 5.25001V5.82095C4.47563 4.82532 1.38844 1.75501 1.35562 1.7222C1.15019 1.51494 0.843182 1.44567 0.568648 1.54462C0.294114 1.64357 0.101904 1.89279 0.0759371 2.18345C-0.328125 6.66376 0.973124 9.66189 2.13844 11.3878C2.70663 12.241 3.39786 13.0056 4.18969 13.6566C2.76187 15.3 0.51375 16.1635 0.489375 16.1728C0.274975 16.2531 0.108995 16.427 0.0386818 16.6448C-0.0316315 16.8627 0.00142327 17.1008 0.128437 17.2913C0.19875 17.3963 0.48 17.7647 1.16719 18.1088C2.01656 18.5344 3.13875 18.75 4.5 18.75C11.1253 18.75 16.6612 13.6481 17.2266 7.08376L20.0306 4.28064C20.2451 4.06602 20.3091 3.74336 20.1928 3.46314ZM15.9741 6.22032C15.8455 6.34922 15.7682 6.5205 15.7566 6.7022C15.375 12.6169 10.4325 17.25 4.5 17.25C3.51 17.25 2.8125 17.1188 2.32312 16.9613C3.40219 16.3753 4.90687 15.3675 5.87437 13.9163C5.98915 13.7438 6.02746 13.5315 5.98023 13.3298C5.93299 13.1281 5.80442 12.9549 5.625 12.8513C5.58094 12.8259 1.50844 10.3819 1.5 3.85126C3 5.07001 5.74219 6.96095 8.87531 7.48782C9.09265 7.52447 9.3151 7.46366 9.48358 7.32155C9.65205 7.17944 9.74949 6.97042 9.75 6.75001V5.25001C9.7483 4.44177 10.0728 3.66703 10.65 3.10126C11.2034 2.54687 11.9574 2.23984 12.7406 2.25001C13.9275 2.26501 15.0366 2.98876 15.5006 4.05095C15.6202 4.32384 15.8899 4.5001 16.1878 4.50001H17.6878L15.9741 6.22032Z" fill="#F6D8B8"></path> </svg>`
    },
    {
      name: "YouTube",
      url: "#",
      svg: `<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="social-icon" style="width: 24px; height: 24px; fill: #F6D8B8; cursor: pointer; transition: fill 0.2s ease"> <g clip-path="url(#clip0_30_224)"> <path d="M9.03 14.44C8.69 14.44 8.36 14.44 8.03 14.44C7.81 14.44 7.58 14.44 7.36 14.44C6.65 14.44 5.92 14.43 5.19 14.38C4.39 14.33 3.29 14.26 2.39 13.89C0.68 13.19 0.6 11.19 0.54 9.72001C0.5 8.64001 0.5 7.56001 0.5 6.37001C0.5 6.24001 0.5 6.10001 0.5 5.96001C0.5 4.80001 0.5 3.49001 1 2.41001C1.64 1.03001 3.04 0.800011 4.41 0.700011C5.46 0.620011 6.54 0.590011 7.57 0.570011C9.58 0.530011 11.66 0.480011 13.72 0.560011C14.81 0.600011 15.81 0.670011 16.76 0.780011C17.57 0.870011 18.49 1.03001 19.09 1.76001C19.74 2.55001 19.87 3.60001 19.95 4.70001C19.97 4.92001 19.98 5.14001 19.99 5.39001C20.01 5.93001 20 6.49001 20 7.02001C20 7.27001 20 7.52001 20 7.76001C20 7.93001 20 8.11001 20 8.28001C20 9.17001 20.01 10.09 19.88 11C19.71 12.19 19.37 13.46 18.14 13.88C16.83 14.33 15.43 14.36 14.09 14.38H13.98C13.53 14.39 13.08 14.4 12.63 14.41C11.45 14.44 10.25 14.47 9.04 14.47L9.03 14.44ZM11.29 0.980011C10.04 0.980011 8.8 1.01001 7.58 1.03001C6.55 1.05001 5.49 1.08001 4.45 1.16001C3.17 1.26001 1.98 1.45001 1.44 2.60001C0.98 3.58001 0.98 4.84001 0.99 5.94001C0.99 6.08001 0.99 6.22001 0.99 6.35001C0.99 7.54001 0.99 8.60001 1.02 9.68001C1.08 11.09 1.15 12.84 2.57 13.42C3.39 13.76 4.45 13.82 5.22 13.87C5.93 13.92 6.66 13.92 7.36 13.93C7.58 13.93 7.81 13.93 8.03 13.93C9.55 13.95 11.1 13.92 12.6 13.88C13.05 13.87 13.5 13.86 13.95 13.85H14.06C15.37 13.82 16.73 13.8 17.97 13.37C18.95 13.03 19.23 11.98 19.39 10.88C19.51 10.01 19.51 9.11001 19.5 8.24001C19.5 8.07001 19.5 7.89001 19.5 7.72001C19.5 7.47001 19.5 7.22001 19.5 6.97001C19.5 6.44001 19.5 5.90001 19.49 5.36001C19.49 5.12001 19.47 4.91001 19.45 4.70001C19.37 3.68001 19.26 2.71001 18.7 2.03001C18.22 1.44001 17.44 1.31001 16.69 1.23001C15.75 1.12001 14.77 1.05001 13.69 1.01001C12.89 0.990011 12.09 0.990011 11.29 0.980011ZM11.29 0.980011" fill="#F6D8B8"/> <path d="M15.01 7.49001L8.26 11.39C7.95 11.57 7.57 11.41 7.57 11.05V3.24001C7.57 2.88001 7.95 2.72001 8.26 2.90001L15.01 6.81001C15.32 6.99001 15.32 7.32001 15.01 7.49001ZM15.01 7.49001" fill="#F6D8B8"/> </g> <defs> <clipPath id="clip0_30_224"> <rect width="21" height="15" fill="white"/> </clipPath> </defs> </svg>`
    }
  ];

  return (
    <motion.footer 
      className="flex justify-center items-start w-full bg-[#4B5A43]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex max-w-[960px] flex-col items-start flex-1 w-full">
        <div className="flex flex-col items-start gap-6 flex-1 w-full box-border px-4 py-8 md:px-5 md:py-10">
          <motion.nav 
            className="flex justify-between items-center content-center gap-y-4 w-full flex-wrap" 
            role="navigation" 
            aria-label="Menu do rodapé"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex w-full sm:w-40 min-w-40 flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Link to="/sobre" className="text-[#F6D8B8] text-sm font-normal leading-[21px] hover:text-white transition-colors">
                Sobre o projeto
              </Link>
            </motion.div>
            <motion.div 
              className="flex w-full sm:w-40 min-w-40 flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Link to="/eventos" className="text-[#F6D8B8] text-sm font-normal leading-[21px] hover:text-white transition-colors">
                Eventos
              </Link>
            </motion.div>
            <motion.div 
              className="flex w-full sm:w-40 min-w-40 flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Link to="/blog" className="text-[#F6D8B8] text-sm font-normal leading-[21px] hover:text-white transition-colors">
                Notícias / Blog
              </Link>
            </motion.div>
            <motion.div 
              className="flex w-full sm:w-40 min-w-40 flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Link to="/contato" className="text-[#F6D8B8] text-sm font-normal leading-[21px] hover:text-white transition-colors">
                Contato
              </Link>
            </motion.div>
          </motion.nav>
          <motion.div 
            className="flex justify-center items-center content-center gap-4 w-full flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {socialIcons.map((icon, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <a 
                  href={icon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Seguir no ${icon.name}`}
                  className="hover:opacity-80 transition-opacity"
                  dangerouslySetInnerHTML={{ __html: icon.svg }}
                />
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="flex flex-col items-center w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="w-full text-[#F6D8B8] text-center text-sm md:text-base font-normal leading-6">
              © 2024 Os Trem. Todos os direitos reservados.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
