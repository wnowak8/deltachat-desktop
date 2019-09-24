import React, { useContext }  from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { Timestamp } from '../conversations'
import MessageBody from '../MessageBody'
import { Avatar, VerifiedIcon } from '../helpers/Contact'
import C from 'deltachat-node/constants'
import ScreenContext from '../../contexts/ScreenContext'

const FreshMessageCounter = React.memo(props => {
  const { counter } = props
  if (counter === 0) return null
  return <div className='chat-list-item__fresh-message-counter' >{counter}</div>
})

const Header = React.memo(props => {
  const { freshMessageCounter, lastUpdated } = props.chatListItem
  const { name, email, isVerified, isGroup, isSelected } = props.chatListItem

  return (
    <div className='chat-list-item__header'>
      <div className={classNames(
        'chat-list-item__header__name',
        freshMessageCounter > 0 ? 'chat-list-item__header__name--with-unread' : null
      )}>
        {isGroup && <div className='chat-list-item__group-icon' />}
        {isVerified && <VerifiedIcon />}
        <span className='chat-list-item__name'>
          {(name || email) + ' '}
        </span>
      </div>
      <div className={classNames(
        'chat-list-item__header__date',
        { 'chat-list-item__header__date--has-unread': freshMessageCounter > 0 }
      )}>
        <Timestamp
          timestamp={lastUpdated}
          extended={false}
          module='chat-list-item__header__timestamp'
        />
      </div>
    </div>
  )
})

export const Message = React.memo(props => {
  const { summary, freshMessageCounter } = props.chatListItem
  if (!summary) return null

  return (
    <div className='chat-list-item__message'>
      <div className={classNames(
        'chat-list-item__message__text',
        { 'chat-list-item__message__text--has-unread': freshMessageCounter > 0 }
      )}>
        { summary.text1 !== null &&
          <div className={classNames(
            'chat-list-item__message__text__summary',
            { 'chat-list-item__message__text__summary--draft': summary.status === 'draft' }
          )}>{summary.text1 + ': ' }</div>
        }
        <MessageBody text={summary.text2 || ''} disableJumbomoji preview />
      </div>
      { summary.status && <div className={'chat-list-item__message__status-icon chat-list-item__message__status-icon--' + summary.status} /> }
      <FreshMessageCounter counter={freshMessageCounter} />
    </div>
  )
})

export const PlaceholderChatListItem = React.memo((props) => { return <div style={{ height: '64px' }} /> })

const ChatListItemArchiveLink = React.memo(props => {
  const { chatListItem, onClick } = props
  return (
    <div
      role='button'
      onClick={onClick}
      className={'chat-list-item'}
    >
      <div className='chat-list-item__archive-link'>{chatListItem.name}</div>
    </div>
  )
})


const ChatListItemNormal = React.memo(props => {
  const { chatListItem, onClick, isSelected, onContextMenu } = props
  return (
    <div
      role='button'
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={classNames(
        'chat-list-item',
        {
          'chat-list-item--has-unread': chatListItem.freshMessageCounter > 0,
          'chat-list-item--is-selected': isSelected
        },
        props.className
      )}
    >
      <Avatar {...chatListItem} displayName={chatListItem.name} />
      <div className='chat-list-item__content'>
        <Header chatListItem={chatListItem} />
        <Message chatListItem={chatListItem} />
      </div>
    </div>
  )
})

const ChatListItemDeaddrop = React.memo(props => {
  const { chatListItem } = props
  const { openDialog } = useContext(ScreenContext)
  const onClick = () => openDialog('DeadDrop', {deaddrop: chatListItem.deaddrop})
  return <ChatListItemNormal {...{chatListItem, onClick, className:'chat-list-item--is-deaddrop'}} />
})

const ChatListItem = React.memo(props => {
  const { chatListItem, onClick, isSelected, onContextMenu } = props
  console.log(chatListItem)
  if (chatListItem === null) return null
  if (typeof chatListItem === 'undefined') return <PlaceholderChatListItem />
  if (chatListItem.id === C.DC_CHAT_ID_DEADDROP) return <ChatListItemDeaddrop chatListItem={chatListItem} />
  if (chatListItem.id === C.DC_CHAT_ID_ARCHIVED_LINK) return <ChatListItemArchiveLink onClick={onClick} chatListItem={chatListItem} />
  console.log(chatListItem)
  return <ChatListItemNormal {...props} />
}, (prevProps, nextProps) => {
  const shouldRerender = prevProps.chatListItem !== nextProps.chatListItem || prevProps.isSelected !== nextProps.isSelected
  return !shouldRerender
})

export default ChatListItem
