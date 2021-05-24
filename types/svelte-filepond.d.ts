declare module 'svelte-filepond' {
  import { SvelteComponentTyped } from "svelte";
  
  type FilePondMethods =
    typeof import("filepond")["FilePond"]["prototype"];
  
  interface FilepondProps {
    /**
     * @constant
     */
    registerPlugin?: (...plugins: unknown[]) => void;
  
    /**
     * @constant
     */
    isSupported?: boolean;
  
    id?: string;
  
    name?: string;
  
    allowMultiple?: boolean;
  
    required?: boolean;
  
    captureMethod?: string;
  
    acceptedFileTypes?: string;
  
    addFile?: FilePondMethods["addFile"];
  
    addFiles?: FilePondMethods["addFiles"];
  
    browse?: FilePondMethods["browse"];
  
    fireSync?: () => void;
  
    getFile?: FilePondMethods["getFile"];
  
    getFiles?: FilePondMethods["getFiles"];
  
    moveFile?: FilePondMethods["moveFile"];
  
    prepareFile?: FilePondMethods["prepareFile"];
  
    prepareFiles?: FilePondMethods["prepareFiles"];
  
    processFile?: FilePondMethods["processFile"];
  
    processFiles?: FilePondMethods["processFiles"];
  
    removeFile?: FilePondMethods["removeFile"];
  
    removeFiles?: FilePondMethods["removeFiles"];
  
    sort?: FilePondMethods["sort"];
  }
  
  export default class FilePond extends SvelteComponentTyped<
    FilepondProps,
    // eslint-disable-next-line @typescript-eslint/ban-types
    {},
    // eslint-disable-next-line @typescript-eslint/ban-types
    {}
  > {}
  
  export { registerPlugin, supported } from "filepond";
}
