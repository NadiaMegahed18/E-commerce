import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

export default async function middleware(req: NextRequest) {


  const jwt = await getToken({ req })

  console.log("jwt", jwt);

  if (jwt) {


    return NextResponse.next()

  }

  return NextResponse.redirect(new URL('/login', req.url))

}

export const config = {
  matcher: []
}