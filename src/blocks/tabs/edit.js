/**
 * BLOCK: Tabs
 */
import TabsContext from './context';
const { InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow, Button, ButtonGroup, ToggleControl, SelectControl } = wp.components;
const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { compose } = wp.compose;
const { withDispatch, withSelect } = wp.data;
const { useState } = wp.element;

/**
 * This component create editor UI for tabs block.
 * A tabs block contains two parts
 * 	- Tab title, an array of tab titles associated with attribute 'tabTitles'
 *  - Tab content, an array of child tab block rendered by innderblock template.
 * Tab titles and Tab content are complete seprate. For example, action such as move tab position or delete a tab will envolve actions for both tab title and tab content.
 * @param {object} props block props.
 */
const Edit = ( props ) => {
	const {
		attributes,
		setAttributes,
		removeBlock,
		onMoveUp,
		onMoveDown,
		tabs,
		isSelected,
		rootId,
		insertBlock,
	} = props;
	const { tabTitles, initialTabSelected, className, sideTabLayout, styleString } = attributes;
	// Keep current selected tab in editor as a state defaults to initialSelected tab attribute.
	const [ currentTabSelected, setCurrentTabSelected ] = useState(
		initialTabSelected ? initialTabSelected : 0
	);
	const allowedBlocks = [ 'ubc/tab' ];
	const blockProps = useBlockProps({
		className: `ubc-accordion-tabs ${ className ? className : '' } tabs-style-${ styleString }  ${sideTabLayout && ' side-tab-layout'}`
	});
	/**
	 * Render innerblocks { tab blocks } based on the length of tab titles array.
	 */
	const getInnerBlockTemplates = () => {
		return tabTitles.map( function( title, key ) {
			return [
				'ubc/tab',
				{
					index: key,
				},
			];
		} );
	};

	/**
	 * Abstracted setter for tab title based on index in the tab titles array
	 *
	 * @param {number} key index of the tab in the array.
	 * @param {string} text new title to be updated.
	 */
	const updateSingleTitle = ( key, text ) => {
		const tabTitlesClone = [ ...tabTitles ];
		tabTitlesClone[ key ] = text;
		setAttributes( {
			tabTitles: tabTitlesClone,
		} );
	};

	/**
	 * Check if it is the first tab in the array.
	 *
	 * @param {number} index index of the tab in the array
	 * @return {boolean} if index is the first in the array.
	 */
	const isFirst = ( index ) => {
		return index === 0;
	};

	/**
	 * Check if it is the last tab in the array.
	 *
	 * @param {number} index index of the tab in the array
	 * @return {boolean} if index is the last in the array.
	 */
	const isLast = ( index ) => {
		return index === tabTitles.length - 1;
	};

	/**
	 * Render Toolbar buttons including re-order, remove, add, etc for each tab
	 *
	 * @param {number} key index of the tab.
	 */
	const renderToolbar = ( key ) => {
		return currentTabSelected === key ? (
			<div className="ubc-accordion-tabs__tab-toolbar">
				<Button
					onClick={ ( event ) => {
						event.preventDefault();
						// move tab title up inside tab titles array
						const newTabTitles = [ ...tabTitles ];
						[ newTabTitles[ key - 1 ], newTabTitles[ key ] ] = [
							newTabTitles[ key ],
							newTabTitles[ key - 1 ],
						];
						setAttributes( {
							tabTitles: newTabTitles,
						} );
						// Move the actual tab block up
						onMoveUp( key );
						// Move focus as well to make sure action does not cause different tab to be selected.
						setCurrentTabSelected( key - 1 );
					} }
					disabled={ isFirst( key ) || tabTitles.length <= 1 }
				>
					<span className="dashicons dashicons-arrow-left-alt2"></span>
				</Button>

				<Button
					onClick={ ( event ) => {
						event.preventDefault();
						// Move tab title down inside tab titles array
						const newTabTitles = [ ...tabTitles ];
						[ newTabTitles[ key ], newTabTitles[ key + 1 ] ] = [
							newTabTitles[ key + 1 ],
							newTabTitles[ key ],
						];
						setAttributes( {
							tabTitles: newTabTitles,
						} );
						// Move the actual tab block down
						onMoveDown( key );
						// Move focus as well to make sure action does not cause different tab to be selected.
						setCurrentTabSelected( key + 1 );
					} }
					disabled={ isLast( key ) || tabTitles.length <= 1 }
				>
					<span className="dashicons dashicons-arrow-right-alt2"></span>
				</Button>

				<Button
					onClick={ ( event ) => {
						event.preventDefault();
						// Remove tab title from tab titles array
						const remainingTabs = tabTitles.filter(
							( title, index ) => key !== index
						);
						setAttributes( {
							tabTitles: remainingTabs,
						} );
						// Remove the actual tab block
						removeBlock( key );
						// Set focus to the first tab of the remaining tabs
						if ( remainingTabs.length !== 0 ) {
							setCurrentTabSelected( 0 );
						}
					} }
				>
					<span className="dashicons dashicons-trash"></span>
				</Button>

				<Button
					onClick={ async ( event ) => {
						event.preventDefault();

						// Create the tab block and insert at the end of the root block.
						await insertBlock(
							wp.blocks.createBlock( 'ubc/tab', { index: tabs.length } ),
							tabs.length,
							rootId
						);

						// Add a new title into the title array.
						setAttributes( {
							tabTitles: [ ...tabTitles, 'Tab' ],
						} );
					} }
				>
					<span
						className="dashicons dashicons-plus"
						style={ { marginTop: '3px' } }
					></span>
				</Button>
			</div>
		) : null;
	};
	const onChangeTabLabel = toggle => {
		setAttributes({ sideTabLayout: toggle });
	};
	return (
		<section { ...blockProps }>
			<ul className="ubc-accordion-tabs__tab-list" role="tablist">
				{ tabTitles.map( ( singleTitle, key ) => {
					return (
						<li role="presentation" key={ key }>
							{ isSelected ? renderToolbar( key ) : null }
							<button
								role="tab"
								id={ `tab${ key }` }
								aria-controls={ `section${ key } ` }
								aria-selected={ key === currentTabSelected }
								href={ `#section${ key + 1 }` }
								className={ `ubc-accordion-tabs__button${
									key === currentTabSelected ? ' is-selected' : ''
								}` }
								onClick={ ( event ) => {
									event.preventDefault();
									setCurrentTabSelected( key );
								} }
							>
								<RichText
									value={ singleTitle }
									onChange={ ( newContent ) => updateSingleTitle( key, newContent ) }
								/>
							</button>
						</li>
					);
				} ) }
			</ul>
			<TabsContext.Provider
				value={ {
					currentTabSelected,
					tabs,
					tabTitles,
				} }
			>
				<InnerBlocks
					template={ getInnerBlockTemplates() }
					templateLock={ false }
					allowedBlocks={ allowedBlocks }
					renderAppender={ false }
				/>
			</TabsContext.Provider>
			<InspectorControls>
				<PanelBody title="Settings" initialOpen={ true }>
					<PanelRow>Initial tab selected</PanelRow>
					<ButtonGroup style={ { marginTop: '10px' } }>
						{ tabTitles.map( ( tabTitle, index ) => {
							return (
								<Button
									onClick={ ( event ) => {
										event.preventDefault();
										setAttributes( {
											initialTabSelected: index,
										} );
									} }
									key={ index }
									isPrimary={ initialTabSelected === index }
									isDefault={ initialTabSelected !== index }
								>
									{ tabTitle }
								</Button>
							);
						} ) }
					</ButtonGroup>
					<hr />
					<PanelRow>Tab Format</PanelRow>
					<ToggleControl
						label="Switch to side tab layout"
						help={
							sideTabLayout
								? 'Side tab layout selected'
								: 'Defoult layout'
						}
						checked={ sideTabLayout }
						onChange={ onChangeTabLabel }
					/>
					<hr />
					<PanelRow>Style options</PanelRow>
					<SelectControl
						label="Preferred style"
						value={ styleString }
						options={ [
									{label: "Plain", value: 'plain'},
									{label: "Colourful", value: 'colorful'}
								] }
						onChange={ (newval) => setAttributes({ styleString: newval }) }
					/>
				</PanelBody>
			</InspectorControls>
		</section>
	);
};

export default compose( [
	withSelect( ( select, ownProps ) => {
		const { getBlockOrder } = select( 'core/block-editor' );
		return {
			// Get an array of child blocks( tab blocks ) client ID in order.
			tabs: getBlockOrder( ownProps.clientId ),
			rootId: ownProps.clientId,
		};
	} ),
	withDispatch( ( dispatch, { tabs, clientId } ) => {
		const { removeBlock, moveBlocksDown, moveBlocksUp, insertBlock } = dispatch(
			'core/block-editor'
		);
		return {
			/**
			 * Move specific tab block down, switch position with next tab block.
			 * @param {integer} index position index in the child tab blocks array.
			 */
			onMoveDown( index ) {
				moveBlocksDown( [ tabs[ index ] ], clientId );
			},
			/**
			 * Move specific tab block up, switch position with previous tab block.
			 * @param {integer} index position index in the child tab blocks array.
			 */
			onMoveUp( index ) {
				moveBlocksUp( [ tabs[ index ] ], clientId );
			},
			/**
			 * Remove specific tab block.
			 * @param {integer} index position index in the child tab blocks array.
			 */
			removeBlock( index ) {
				removeBlock( tabs[ index ] );
			},
			insertBlock,
		};
	} ),
] )( Edit );
