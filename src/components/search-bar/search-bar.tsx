import React, { ChangeEvent, useState } from 'react'
import { SearchBarWrapper, Text, IconWrapper } from './styles'
import { AiOutlineSearch } from 'react-icons/ai';

export interface SearchBarProps {
  /**
   * Search string
   */
  value?: string;
  /**
   * Placeholder when value empty
   */
  placeholder: string;
  /**
   * On change handler
   */
  onChange: (event?: ChangeEvent<HTMLInputElement>) => void
}

/**
 * SearchBar for list filtering
 */
export const SearchBar = (props: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(props.value);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    props.onChange(event);
  };

  return (
    <SearchBarWrapper>
      <IconWrapper data-testid="searchIcon">
        <AiOutlineSearch size={20} />
      </IconWrapper>
      <Text value={inputValue} placeholder={props.placeholder} onChange={handleInputChange} />
    </SearchBarWrapper>
  )
}
