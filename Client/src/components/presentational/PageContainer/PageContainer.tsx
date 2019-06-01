import * as React from 'react';

interface PageContainerProps {
    title?: string | null;
}

export default class PageContainer extends React.Component<PageContainerProps, {}> {
    public render(): React.ReactElement {
        return(
            <div>
                PageContainer 
            </div>
        )
    }
}