declare module 'svelte-filepond' {
  import { SvelteComponentTyped } from 'svelte'
  import { FilePond } from 'filepond'

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

    addFile?: FilePond["addFile"];

    addFiles?: FilePond["addFiles"];

    browse?: FilePond["browse"];

    fireSync?: () => void;

    getFile?: FilePond["getFile"];

    getFiles?: FilePond["getFiles"];

    moveFile?: FilePond["moveFile"];

    prepareFile?: FilePond["prepareFile"];

    prepareFiles?: FilePond["prepareFiles"];

    processFile?: FilePond["processFile"];

    processFiles?: FilePond["processFiles"];

    removeFile?: FilePond["removeFile"];

    removeFiles?: FilePond["removeFiles"];

    sort?: FilePond["sort"];
  }

  export default class FilePond extends SvelteComponentTyped<
    FilepondProps,
    // eslint-disable-next-line @typescript-eslint/ban-types
    {},
    // eslint-disable-next-line @typescript-eslint/ban-types
    {}
  > { }

  export { registerPlugin, supported } from "filepond";
}
