/* eslint-disable no-console */
import { addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useFirestoreQueryCondition } from '~/api/core'
import { addTimeStamp } from '~/helper/FirebaseHelper'

const collectionRef = collection(db, 'users')

export const createUser = async function (user) {
  await addDoc(collectionRef, addTimeStamp(user))
}

export const getAllUser = function () {
  const users = []
  onSnapshot(collectionRef, (snapshort) => {
    snapshort.docs.map((doc) => users.push(doc.data()))
  })
  return users
}

export const getUserByEmail = async function (email) {
  const data = await useFirestoreQueryCondition(
    'users',
    {
      field: 'email',
      operator: '==',
      value: email,
    },
    null,
    1
  )

  const user = data[0]

  return user
}

export const setActiveUser = function (valueActive) {
  const currentUser = JSON.parse(localStorage.getItem('user'))

  const docRef = doc(db, 'users', currentUser.id)

  setDoc(docRef, { ...currentUser, isActive: valueActive })
}
