import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import debug from "debug"
import { setConfig } from 'next/config'
import { publicRuntimeConfig } from './next.config'

configure({ adapter: new Adapter() });
setConfig({ publicRuntimeConfig })

// Jest swallows stderr from debug, so if process is called with DEBUG then redirect debug to console.log
if (process.env.DEBUG) {
    debug.log = console.log.bind(console) 
} 