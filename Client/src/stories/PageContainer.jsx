import * as React from 'react';
import { storiesOf } from '@storybook/react';
import PageContainer from '../../src/client/components/presentational/PageContainer/PageContainer'

storiesOf('PageContainer', module)
.add('Default', () => (
    <PageContainer title="default" />
), { info: { inline: true }})  