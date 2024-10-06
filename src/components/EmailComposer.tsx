import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from './EmailComposer.module.css';

interface EmailComposerProps {
  activeTab: 'html' | 'plain';
}

const EmailComposer: React.FC<EmailComposerProps> = ({ activeTab }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [plainContent, setPlainContent] = useState('');

  return (
    <div className={styles.composerContainer}>
      <div className={styles.recipientContainer}>
        <label htmlFor="recipient" className={styles.label}>受信者</label>
        <input type="text" id="recipient" className={styles.input} />
      </div>
      {activeTab === 'html' ? (
        <div className={styles.htmlContainer}>
          <div className={styles.editorContainer}>
            <CKEditor
              editor={ClassicEditor}
              data={htmlContent}
              onChange={(event, editor) => {
                const data = editor.getData();
                setHtmlContent(data);
              }}
            />
          </div>
          <div className={styles.previewContainer}>
            <h3 className={styles.previewTitle}>プレビュー</h3>
            <div
              className={styles.preview}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.plainContainer}>
          <textarea
            className={styles.plainTextArea}
            value={plainContent}
            onChange={(e) => setPlainContent(e.target.value)}
            placeholder="Enter your plain text content here..."
          />
        </div>
      )}
      <button className={styles.sendButton}>メール送信</button>
    </div>
  );
};

export default EmailComposer;