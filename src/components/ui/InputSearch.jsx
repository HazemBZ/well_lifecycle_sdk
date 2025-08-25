import React, { useState } from 'react'
import Icon from '../AppIcon'

const InputSearch = ({
  placeholder = 'Search...',
  onSearch,
  initialValue = '',
  className = '',
  size = 'md',
  isForm = true,
  name = null,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)

  // Size classes
  const sizeClasses = {
    sm: 'py-1 pl-8 pr-3 text-sm',
    md: 'py-2 pl-9 pr-3 text-sm',
    lg: 'py-2.5 pl-10 pr-4 text-base',
  }

  // Icon size based on input size
  const iconSize = {
    sm: 14,
    md: 16,
    lg: 18,
  }

  // Handle input change
  const handleChange = e => {
    setSearchValue(e.target.value)
    if (onSearch) onSearch(e.target.value)
  }

  // Handle search submission
  const handleSubmit = e => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchValue)
    }
  }

  // Handle clear button click
  const handleClear = () => {
    setSearchValue('')
    if (onSearch) {
      onSearch('')
    }
  }

  return (
    <>
      {isForm ? (
        <form onSubmit={handleSubmit} className={`relative ${className}`}>
          <div className='relative'>
            <div
              className={`absolute inset-y-0 left-0 flex items-center ${
                size === 'sm' ? 'pl-2.5' : size === 'lg' ? 'pl-3.5' : 'pl-3'
              }`}
            >
              <Icon
                name='Search'
                size={iconSize[size]}
                className={`text-neutral-400 ${isFocused ? 'text-primary-500' : ''}`}
              />
            </div>
            <input
              type='text'
              name={name}
              className={`block w-full rounded-md border border-neutral-300 bg-white shadow-sm focus:border-primary-500 focus:ring-primary-500 focus:outline-none ${sizeClasses[size]}`}
              placeholder={placeholder}
              value={searchValue}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />
            {searchValue && (
              <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                <button
                  type='button'
                  onClick={handleClear}
                  className='text-neutral-400 hover:text-neutral-500 focus:outline-none'
                >
                  <Icon name='X' size={iconSize[size]} />
                </button>
              </div>
            )}
          </div>
        </form>
      ) : (
        <div className='relative'>
          <div
            className={`absolute inset-y-0 left-0 flex items-center ${
              size === 'sm' ? 'pl-2.5' : size === 'lg' ? 'pl-3.5' : 'pl-3'
            }`}
          >
            <Icon
              name='Search'
              size={iconSize[size]}
              className={`text-neutral-400 ${isFocused ? 'text-primary-500' : ''}`}
            />
          </div>
          <input
            type='text'
            name={name}
            className={`block w-full rounded-md border border-neutral-300 bg-white shadow-sm focus:border-primary-500 focus:ring-primary-500 focus:outline-none ${sizeClasses[size]}`}
            placeholder={placeholder}
            value={searchValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {searchValue && (
            <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
              <button
                type='button'
                onClick={handleClear}
                className='text-neutral-400 hover:text-neutral-500 focus:outline-none'
              >
                <Icon name='X' size={iconSize[size]} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default InputSearch
