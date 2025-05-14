import React from 'react';
import { FC } from 'react';

type Props = {
  value: string;
  handleCity: () => void;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  urlImg: string;
};

export const InputWithImage: FC<Props> = ({
  value,
  urlImg,
  handleCity,
  onChange,
}) => {
  return (
    <div className="layer2">
      <label htmlFor="search"></label>
      <input
        className="input-for-city"
        id="search"
        type="text"
        value={value}
        onChange={onChange}
      />
      <button className="button-enter" onClick={handleCity}>
        Submit
      </button>
      <img className="map-city" src={urlImg} />
    </div>
  );
};
