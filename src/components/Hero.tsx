import React from 'react';

const Hero = () => {
  return (
    <section className="flex flex-col items-center w-full box-border px-40 py-0">
      <div className="w-full h-[480px] min-h-[480px] relative">
        <div className="flex w-[calc(100%_-_90px)] h-[391px] flex-col items-start gap-[179px] absolute left-[45px] top-[89px]">
          <div className="flex h-[177px] flex-col items-start">
            <div className="w-[447px] h-[139px] relative max-sm:w-4/5">
              <div className="w-[376px] h-[43px] absolute bg-[#9C4716] left-0 top-0.5 max-sm:w-4/5" />
              <div className="w-[319px] h-[43px] absolute bg-[#9C4716] left-0 top-[49px] max-sm:w-[70%]" />
              <div className="w-[343px] h-[43px] absolute bg-[#9C4716] left-0 top-24 max-sm:w-9/12" />
              <h1 className="w-[443px] text-[#F6D8B8] text-5xl font-normal leading-[45px] tracking-[-2px] absolute h-[135px] left-1 top-0">
                Onde o chão vira palavra e o rio conta histórias.
              </h1>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <p className="w-full text-[#F6D8B8] text-center text-base font-normal leading-6">
              Explorando as expressões culturais e artísticas na cuenca do rio, combinando arte, geografia e memória.
            </p>
          </div>
        </div>
        <div className="inline-flex justify-center items-start content-start gap-3 flex-wrap absolute w-[332px] h-12 left-[463px] top-[379px]">
          <button className="flex w-40 h-12 justify-center items-center gap-2.5 bg-[#004A24] p-2.5 rounded-lg hover:bg-[#005a2d] transition-colors">
            <span className="text-[#F6D8B8] text-center text-base font-bold leading-6">
              Sobre o projeto
            </span>
          </button>
          <button className="flex w-40 h-12 justify-center items-center gap-2.5 bg-[#F6D8B8] p-2.5 rounded-lg hover:bg-[#f0d0a8] transition-colors">
            <span className="text-[#4B5A43] text-center text-base font-bold leading-6">
              Envie sua poética
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
