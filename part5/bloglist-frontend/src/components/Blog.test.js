import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
import CreateForm from './CreateForm'

const blog = {
    url: 'www.url.com',
    title: 'This is the title',
    author: 'Mark Markovic',
    likes: 0,
    user: {
        id: 123
    }
}

test('renders only title', () => {
    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent('This is the title')
    expect(component.container).not.toHaveTextContent('Mark Markovic')
    expect(component.container).not.toHaveTextContent('likes')
})

test('url and likes shown when button clicked', () => {
    const component = render(
        <Blog blog={blog} />
    )
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('This is the title')
    expect(component.container).toHaveTextContent('Mark Markovic')
    expect(component.container).toHaveTextContent('likes')
})

test('when like clicked twice, like handler run twice', () => {
    const mockLike = jest.fn()

    const component = render(
        <Blog blog={blog} handleLike={mockLike} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const buttonLike = component.getByText('like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(mockLike.mock.calls).toHaveLength(2)
})

test('passing props to handler when creating a blog', () => {
    const mockCreate = jest.fn()

    const component = render(
        <CreateForm handleCreate={mockCreate} />
    )

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const button = component.container.querySelector('#create-blog')

    fireEvent.change(inputTitle, { target: { value: 'testTitle' } })
    fireEvent.change(inputAuthor, { target: { value: 'testAuthor' } })
    fireEvent.change(inputUrl, { target: { value: 'testUrl' } })
    fireEvent.click(button)

    expect(mockCreate.mock.calls[0][0]).toMatchObject({
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testUrl'
    })
})